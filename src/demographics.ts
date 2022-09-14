export type DemographicValues = {
    jobArea: string;
    jobTitle: string;
    companySector: string;
    generalExperience: number;
    cloudExperience: number;
}

export function getEmptyDemographics(): DemographicValues {
    return {jobArea: "", jobTitle: "", companySector: "", generalExperience: 0, cloudExperience: 0};
}