import type { Factor } from "./factors";
import type { DemographicValues } from "./demographics"
import { getEmptyDemographics } from "./demographics";
import { generateSecondsTimeStamp } from './timerManagement';
import type { PilotFeedback } from "./components/Feedback.vue";

export function saveGroupsLocally(groups: string[]): void {
    localStorage['groups'] = JSON.stringify(groups);
}

export function loadLocallyStoredGroups(): string[] {
    let groups: string[] = [];
    let storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
        try {
            groups = JSON.parse(storedGroups);
        } catch (e) {
            localStorage.removeItem('groups');
        }
    }
    return groups;
}

function clearLocallyStoredGroups(): void {
    localStorage.removeItem('groups');
}


export function saveFactorLocally(factor: Factor): void {
    let factors = loadLocallyStoredFactors();
    // check if a factor with the same key as the given factor already exists
    var factorLength = factors.length;
    var factorAlreadyStored = false;
    for (var i = 0; i < factorLength; i++) {
        if (factors[i].key && factors[i].key == factor.key) {
            // if yes, overwrite the existing factor
            factors[i] = factor;
            factorAlreadyStored = true;
            break;
        }
    }
    if (!factorAlreadyStored) {
        // if no, add factor to array
        factors.push(factor)
    }
    // finally, store factor array in local storage again
    localStorage.setItem('factors', JSON.stringify(factors));
}

export function saveAllFactorsLocally(factors: Factor[]): void {
    localStorage.setItem('factors', JSON.stringify(factors));
}

export function loadFactorLocally(factorKey: string): Factor | "not found" {
    let factors = loadLocallyStoredFactors();
    // check if the factor has already been saved
    var factorLength = factors.length;
    for (var i = 0; i < factorLength; i++) {
        if (factors[i].key && factors[i].key == factorKey) {
            // if yes, return it
            return factors[i];
        }
    }
    // if not, return error
    return "not found";
}

export function loadLocallyStoredFactors(): Factor[] {
    let factors: Factor[] = [];
    let storedFactors = localStorage.getItem('factors');
    if (storedFactors) {
        try {
            factors = JSON.parse(storedFactors);
        } catch (e) {
            localStorage.removeItem('factors');
        }
    }
    return factors;
}

function clearLocallyStoredFactors(): void {
    localStorage.removeItem('factors');
}

export function saveDemographicsLocally(demographics: DemographicValues): void {
    localStorage.setItem('demographics', JSON.stringify(demographics));
}

export function loadLocallyStoredDemographics(): DemographicValues {
    let demographics: DemographicValues;
    let storedDemographics = localStorage.getItem('demographics');
    if (storedDemographics) {
        try {
            demographics = JSON.parse(storedDemographics);
        } catch (e) {
            localStorage.removeItem('demographics');
        }
    }
    return getEmptyDemographics();
}

function clearLocallyStoredDemographics(): void {
    localStorage.removeItem('demographics');
}

export function checkLocallyIfPilot(): boolean {
    if (localStorage.getItem('pilot')) {
        return !!(localStorage.getItem('pilot'))
    } else {
        return false;
    }
}

export function clearStoredSurveyData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('pilot');
    clearLocallyStoredGroups();
    clearLocallyStoredFactors();
    clearLocallyStoredDemographics();
}

function clearInMemorySurveyData(): void {
    token = "";
    sessionId = "";
    pilot = false;
}

var token: string = "";
var sessionId: string = "";
var pilot: boolean = false;

var serverURL: string = "";
switch (import.meta.env.MODE) {
    case "development":
        serverURL = "http://localhost:8080";
        break;
    case "production":
        serverURL = "https://qmsurvey.pi.uni-bamberg.de"; // "https://qmsurvey.pi.uni-bamberg.de:80" "http://localhost:80"
        break;
    case "offline":
    default:
}

export type TokenValidationResult = {
    isPilot: boolean;
    startTime: number;
}

export function checkTokenValidity(): Promise<TokenValidationResult> {
    return new Promise((resolve, reject) => {
        let currentTime = generateSecondsTimeStamp();
        if (import.meta.env.MODE === "offline") {
            token = "devToken";
            resolve({ isPilot: false, startTime: currentTime });
        } else {
            let urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('survey')) {
                let currentToken: string = (urlParams.get('survey') as string);
                let storedToken: string = localStorage['token'];
                if (storedToken && currentToken === storedToken && localStorage['sessionId'] && localStorage['pilot']) {
                    token = storedToken;
                    sessionId = localStorage['sessionId'];
                    pilot = (localStorage['pilot']  === "true");
                    resolve({ isPilot: pilot, startTime: currentTime });
                } else {
                    clearLocallyStoredFactors();
                    let uuid = generateUUID();
                    fetch(`${serverURL}/backend/api/submit`, {
                        method: 'POST',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow',
                        body: JSON.stringify({
                            token: currentToken,
                            sessionId: uuid,
                            clientStartTime: new Date(currentTime * 1000).toISOString() // *1000 to convert to milliseconds again
                        })
                    })
                    .then(response => {
                        if (response.status == 200) {
                            token = currentToken;
                            localStorage['token'] = currentToken;
                            sessionId = uuid;
                            localStorage['sessionId'] = sessionId;
                            return response.json();
                        } else {
                            reject(response);
                        }
                    })
                    .then(responseBody => {
                        pilot = responseBody.pilot;
                        localStorage['pilot'] = pilot;
                        resolve({ isPilot: pilot, startTime: currentTime });
                    })
                    .catch(error => {
                        reject(error);
                    })
                }
            } else {
                reject("No survey token provided!");
            }
        }
    })
}

// props to https://stackoverflow.com/a/8809472
function generateUUID(): string {
    let d = new Date().getTime(),
        d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};


export function submitFactors(factors: Factor[]): Promise<void> {
    return new Promise((resolve, reject) => {
        if (import.meta.env.MODE === "offline") {
            resolve();
        } else {
            // send only those factors which have been answered and parse factors with correct naming for backend
            let factorsForBackend = factors.filter(factor => factor.answered === true).map(factor => { return { factorKey: factor.key, factorName: factor.name, impacts: factor.impacts } });

            fetch(`${serverURL}/backend/api/${sessionId}/factors`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                body: JSON.stringify({
                    token: token,
                    factors: factorsForBackend
                })
            }).then(response => {
                if (response.status == 200) {
                    resolve();
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            })
        }
    })

}

export function submitDemographics(demographics: DemographicValues): Promise<void> {
    return new Promise((resolve, reject) => {
        if (import.meta.env.MODE === "offline") {
            resolve();
        } else {
            fetch(`${serverURL}/backend/api/${sessionId}/demographics`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                body: JSON.stringify({
                    token: token,
                    jobArea: demographics.jobArea,
                    jobTitle: demographics.jobTitle,
                    companySector: demographics.companySector,
                    generalExperience: demographics.generalExperience,
                    cloudExperience: demographics.cloudExperience
                })
            }).then(response => {
                if (response.status == 200) {
                    resolve();
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            })
        }
    })

}

export function submitContact(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (import.meta.env.MODE === "offline") {
            resolve();
        } else {
            fetch(`${serverURL}/backend/api/${sessionId}/contact`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                body: JSON.stringify({
                    token: token,
                    email: email
                })
            }).then(response => {
                if (response.status == 200) {
                    clearInMemorySurveyData()
                    resolve();
                } else {
                    reject();
                }
            }).catch(error => {
                reject(error);
            })
        }
    })
}

export function submitPilotFeedback(pilotFeedback: PilotFeedback): Promise<void> {
    return new Promise((resolve, reject) => {
        if (import.meta.env.MODE === "offline") {
            resolve();
        } else {
            fetch(`${serverURL}/backend/api/${sessionId}/feedback`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                body: JSON.stringify({
                    token: token,
                    technicalFeedback: pilotFeedback.technicalFeedback,
                    lengthFeedback: pilotFeedback.lengthFeedback,
                    contentFeedback: pilotFeedback.contentFeedback,
                    factorFeedback: pilotFeedback.factorFeedback,
                    email: pilotFeedback.email
                })
            }).then(response => {
                if (response.status == 200) {
                    clearInMemorySurveyData()
                    resolve();
                } else {
                    reject();
                }
            }).catch(error => {
                reject(error);
            })
        }
    })

}
