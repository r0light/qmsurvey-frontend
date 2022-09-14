export type TimeState = {
    startTime: number
    adjustedStartTime: number
    currentlyPaused: boolean
    currentTimeLimit: number
}

type InternalTimeState = {
    startTime: number
    pausedTime: number
    paused: boolean
    timeLimit: number
    pauseMarker: number
}

function toTimeState(internal: InternalTimeState): TimeState {
    return {
        startTime: internal.startTime,
        adjustedStartTime: internal.startTime + internal.pausedTime,
        currentlyPaused: internal.paused,
        currentTimeLimit: internal.timeLimit
    }
}

export function getTimeState(): TimeState {
    let currentTimeState = loadTimeState();

    if (currentTimeState.pauseMarker !== 0) {
        let currentTime = generateSecondsTimeStamp();
        currentTimeState.pausedTime = updatePausedTime(currentTimeState.pausedTime, currentTimeState.pauseMarker, currentTime);
        currentTimeState.pauseMarker = currentTime;
        
    }
    saveTimeState(currentTimeState);
    return toTimeState(currentTimeState);

}

export function startPause(): TimeState {
    let currentTimeState = loadTimeState();

    if (currentTimeState.paused === false) {
        currentTimeState.pauseMarker = generateSecondsTimeStamp();
        currentTimeState.paused = true;
        saveTimeState(currentTimeState);
    }
    return toTimeState(currentTimeState);
}

export function stopPause(): TimeState {
    let currentTimeState = loadTimeState();

    if (currentTimeState.paused === true) {
        let currentTime = generateSecondsTimeStamp();
        currentTimeState.pausedTime = updatePausedTime(currentTimeState.pausedTime, currentTimeState.pauseMarker, currentTime);
        currentTimeState.pauseMarker = 0;
        currentTimeState.paused = false;
        saveTimeState(currentTimeState);
    }
    return toTimeState(currentTimeState);
}

export function resetTimeState(): TimeState {
    let currentTimeState = loadTimeState();
    let defaultTimeState = createInitialTimeState()

    defaultTimeState.paused = currentTimeState.paused;
    if (defaultTimeState.paused === true) {
        defaultTimeState.pauseMarker = defaultTimeState.startTime;
    }
    saveTimeState(defaultTimeState);
    return toTimeState(defaultTimeState);
}

export function increaseTimeLimit(secondsToIncrease: number): TimeState {
    let currentTimeState = loadTimeState();
    currentTimeState.timeLimit = currentTimeState.timeLimit + secondsToIncrease;

    saveTimeState(currentTimeState);
    return toTimeState(currentTimeState);
}

export function clearTimeState(): void {
    localStorage.removeItem('timeState');
}

function updatePausedTime(previousPausedTime: number, pauseMarker: number, currentTime: number): number {
    let timeSinceLastPause = currentTime - pauseMarker;
    return previousPausedTime + timeSinceLastPause;
}

function saveTimeState(newState: InternalTimeState) {
    localStorage.setItem('timeState', JSON.stringify(newState));
}

function loadTimeState(): InternalTimeState {
    let storedTimeState = localStorage.getItem('timeState');
    if (storedTimeState) {
        try {
            return JSON.parse(storedTimeState);
        } catch (e) {
            localStorage.removeItem('timeState')
        }
    }
    return createInitialTimeState();
}


function createInitialTimeState(): InternalTimeState {
    return {
        startTime: generateSecondsTimeStamp(),
        pausedTime: 0,
        paused: false,
        timeLimit: 600,
        pauseMarker: 0,
    }
}


export function generateSecondsTimeStamp() {
    let millisesconds = Date.now();
    return Math.floor(millisesconds / 1000);
}

