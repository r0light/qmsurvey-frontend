export type Aspect = {
    name: string;
    description: string;
}

export type AspectWrapper = {
    [key: string]: Aspect
}

export type QualityAspect = {
    name: string;
    aspects: AspectWrapper
}

export type QualityAspectWrapper = {
    [key: string]: QualityAspect
}

export function getQualityAspects(): QualityAspectWrapper {
    return qualityAspects;
}

export type ImpactWrapper = {
    [key: string]: number;
}

export function getEmptyImpacts(): ImpactWrapper {
    var initializedImpacts: ImpactWrapper = {};
    for (const [topAspectKey, topAspect] of Object.entries(qualityAspects)) {
        for (const [aspectKey, aspect] of Object.entries(topAspect.aspects)) {
            initializedImpacts[aspectKey] = 0;
          }
      }
    return initializedImpacts;
}

const qualityAspects = {
    security: {
        name: "Security",
        aspects: {
            confidentiality: {
                name: "Confidentiality",
                description: "Confidentiality describes to what extent data processed in a system is only accessible to those who actually need it and is otherwise protected from illegitimate access."
            },
            integrity: {
                name: "Integrity",
                description: "Integrity describes how well a system is able to prevent unauthorized access or manipulation of functions and data."
            },
            nonrepudiation: {
                name: "Non-repudiation",
                description: "Non-repudiation describes to what extent it is possible to prove and reconstruct which actions have taken place in a system."
            },
            accountability: {
                name: "Accountability",
                description: "Accountability describes to what extent it is possible in a system to trace back actions that have taken place back to the subject that performed them."
            },
            authenticity: {
                name: "Authenticity",
                description: "Authenticity describes how well a system is able to identify a subject and validate its identity as well as claims made by a subject."
            }
        }
    },
    maintainability: {
        name: "Maintainability",
        aspects: {
            modularity: {
                name: "Modularity",
                description: "Modularity describes how well a system is composed of different components, so that a change in one component has a minimal impact on other components."
            },
            reusability: {
                name: "Reusability",
                description: "Reusability describes to what extent parts of a system can be used in more than one system."
            },
            analyzability: {
                name: "Analyzability",
                description: "Analyzability describes to what extent it is possible to accurately assess the impact of an intended change as well as the extent to which failures can be diagnosed to find their cause or parts that need to be changed can be identified."
            },
            modifiability: {
                name: "Modifiability",
                description: "Modifiability describes how well a system can be modified without introducing defects or degrading other qualities of the system."
            },
            testability: {
                name: "Testability",
                description: "Testability describes how effective the test criteria defined for a system are in checking the intended behavior of a system as well as how facile it is to perform the tests to determine whether the test criteria are met."
            },
            simplicity: {
                name: "Simplicity",
                description: "Simplicity describes how well a system is composed of as few components as possible and includes simple instead of complex interrelations to enable a good overview and understanding of the system."
            }
        }
    },
    performanceEfficiency: {
        name: "Performance efficiency",
        aspects: {
            timeBehaviour: {
                name: "Time-behaviour",
                description: "Time-behaviour describes how well a system performs in terms of processing and response times as well as the throughput rate when performing its functions."
            },
            resourceUtilization: {
                name: "Resource utilization",
                description: "Resource utilization describes to what extent resources are only used as required by a system when performing its functions, in terms of storage space needed, CPU utilization, memory usage, or network usage."
            },
            capability: {
                name: "Capability",
                description: "Capability describes to which extent the maximum limits of a system meet its requirements, in terms of workload sizes or number of concurrent users."
            },
            elasticity: {
                name: "Elasticity",
                description: "Elasticity describes the rapidness and accurateness with which a system is able to adjust its allocated resources to the currently required amount without over- or under-allocation."
            }
        }
    },
    portability: {
        name: "Portability",
        aspects: {
            adaptability: {
                name: "Adaptability",
                description: "Adaptability describes how well and how easy a system can be adapted to be executed on different software, platforms, environments, or hardware."
            },
            installability: {
                name: "Installability",
                description: "Installability describes how well a system can be installed or uninstalled completely and correctly in a specific environment."
            },
            replaceability: {
                name: "Replaceability",
                description: "Replaceability describes how well a component or system can replace another comparable component or system."
            }
        }
    },
    reliability: {
        name: "Reliability",
        aspects: {
            availability: {
                name: "Availability",
                description: "Availability describes to what extent a system is operational and accessible at any point in time when it is needed."
            },
            faultTolerance: {
                name: "Fault tolerance",
                description: "Fault tolerance describes how well a system is able to operate even when facing software or hardware faults."
            },
            recoverability: {
                name: "Recoverability",
                description: "Recoverability describes how well a system is able to recover and return to the intended state after an interruption or failure."
            },
            maturity: {
                name: "Maturity",
                description: "Maturity describes to what extent a system meets the specified needs for reliability in normal, expected circumstances."
            }
        }
    },
    compatibility: {
        name: "Compatibility",
        aspects: {
            coExistence: {
                name: "Co-existence",
                description: "Co-existence describes how well a system can operate and perform its functions while sharing an environment and resources with other systems and without negatively impacting those other systems."
            },
            interoperability: {
                name: "Interoperability",
                description: "Interoperability describes how well two parts of a system or two systems are able to exchange information and to process such exchanged information."
            }
        }
    }
}
