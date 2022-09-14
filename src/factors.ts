import type { ImpactWrapper } from "./aspectRating";

export type Factor = {
    name: string;
    description: string;
    key: string;
    impacts: ImpactWrapper;
    answered: boolean;
}

export type FactorWrapper = {
    [key: string]: Factor;
}

export type InitialFactor = {
    name: string;
    description: string;
    key?: string;
}

export type InitialFactorWrapper = {
    [key: string]: InitialFactor;
}

export function getFactors(): InitialFactorWrapper {
    return factors;
}

export function listFactors(): InitialFactor[] {
    var factorArray: InitialFactor[] = [];
    for (const [factorKey, factor] of Object.entries(factors)) {
        (factor as any).key = factorKey
        factorArray.push(factor as Factor)
    }
    return factorArray;
}

export function getRandomly(numberOfFactors: number): InitialFactor[] {
    let allFactors: InitialFactor[] = listFactors();
    let shuffled: InitialFactor[] = shuffle(allFactors);

    if (numberOfFactors > 0 && numberOfFactors < shuffled.length) {
        shuffled = shuffled.slice(0, numberOfFactors);
    }
    return shuffled;
}

// props to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: any[]) {
    let currentIndex: number = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const factors = {
    "secretsStoredInSpecializedServices": {
        "name": "Secrets stored in specialized services",
        "description": "A dedicated backing service to host secrets (e.g. passwords, access tokens, encryption keys) can be used which is also able to manage secrets (for example revoke them or replace them with updated secrets). Components receive secrets from this backing services and therefore secrets can be stored securely in one place only, but also stay readily available when needed."
    },
    "accessControlManagementConsistency": {
        "name": "Access control management consistency",
        "description": "By managing access control for endpoints in a consistent way, that means for example using the same format of access control lists or a single account directory in a dedicated backing service for all components, vulnerabilities through misconfiguration can be reduced or avoided. Furthermore it is easier to verify that access restrictions are implemented correctly."
    },
    "accountSeparation": {
        "name": "Account separation",
        "description": "Components should be separated by assigning them different accounts, ideally each component should have an individual account. Through this, it is possible to trace which component performed which actions and in case of an attack accounts that are compromised can be restricted on a fine-grained level so that parts of a system which are not compromised can remain functional."
    },
    "authenticationDelegation": {
        "name": "Authentication delegation",
        "description": "Delegating the verification of an entity for authenticity to a dedicated backing service removes this concern from individual components so that their focus can remain on business functionalities while for example different authentication options can be managed in one place only."
    },
    "limitedDataScope": {
        "name": "Limited data scope",
        "description": "To keep the functional scope of a service limited and therefore cohesive, the service should be concerned only with a limited number of data aggregates that need to be administrated together, for example to fulfill data consistency requirements. Data aggregates for which consistency requirements can be relaxed might be distributed over separate services."
    },
    "commandQueryResponsibilitySegregation": {
        "name": "Command Query Responsibility Segregation",
        "description": "By separating endpoints for read (query) and write (command) operations on data aggregates into different services, changes to these operating can be made independently and also different representations for data aggregates can be used. It can be useful when operations on data aggregates have differing usage patterns, require different formats, or are changed for different reasons."
    },
    "mostlyStatelessServices": {
        "name": "Mostly stateless services",
        "description": "Most services in a cloud-native application should be stateless, that means not requiring durable disk space on the infrastructure that they run on. Stateless services can be replaced, scaled and updated more easily. Stateful services should be reduced to a minimum."
    },
    "specializedStatefulServices": {
        "name": "Specialized stateful services",
        "description": "For stateful components, that means components that do require durable disk space on the infrastructure that they run on, specialized software or frameworks should be used that can handle distributed state by replicating it over several components or component instances while still ensuring consistency requirements for that state."
    },
    "asynchronousCommunication": {
        "name": "Asynchronous communication",
        "description": "By preferring asynchronous links (e.g. based on messaging backing services) for the communication between components, they can be decoupled in time so that not all linked components need to be available at the same time for a successful communication. Additionally, callers do not need to await a response."
    },
    "persistentCommunication": {
        "name": "Persistent communication",
        "description": "By using links that persist messages which have been sent (e.g. based on messaging backing services), components can be decoupled, because components need not even exist at the time a message is sent, but can still receive a message. Through this, communication can also be repeated in case of failures."
    },
    "usageOfExistingSolutionsForNon-CoreCapabilities": {
        "name": "Usage of existing solutions for non-core capabilities",
        "description": "For non-core capabilities readily available solutions can be used. This means solutions which are based on a standard or a specification, are widely adopted and ideally open source so that their well-functioning is ensured by a broader community. Non-core capabilities include interface technologies or protocols for endpoints, infrastructure technologies, and software for backing services. By using such solutions effort might be reduced and components might be easier to integrate."
    },
    "separationByGateways": {
        "name": "Separation by gateways",
        "description": "By separating components or groups of components through gateways, communication can be proxied and controlled at specific components. It also abstracts one part of a system from another so that it can be reused by different components without needing direct links to components that actually provide the needed functionality. This also enables the redirection of communication when components change without changing the gateway endpoint. Furthermore, incoming communication from outside of a system can be controlled at a central component (the gateway) to enable access control."
    },
    "consistentCentralizedLogging": {
        "name": "Consistent centralized logging",
        "description": "Logging functionality, specifically the automated collection of logs, should be concentrated in a centralized component which combines and stores logs from the components of a system. The logs should also be consistent regarding their format and level of granularity. The goal is to facilitate log analysis, for example by also enabling a correlation of logs from different components."
    },
    "consistentCentralizedMetrics": {
        "name": "Consistent centralized metrics",
        "description": "Metrics gathering and calculation functionality for monitoring purposes should be concentrated in a centralized component which combines, aggregates and stores metrics from the components of a system. The metrics should also be consistent regarding their format and level of granularity, although multiple levels of granularity should be supported. The goal is to facilitate the analysis of metrics, for example by also enabling correlations of metrics."
    },
    "distributedTracingOfInvocations": {
        "name": "Distributed tracing of invocations",
        "description": "For request traces that span multiple components in a cloud-native system, distributed tracing should be enabled so that traces based on correlation IDs are captured automatically which can then be analyzed and problems within request traces can be clearly attributed to single components."
    },
    "healthAndReadinessChecks": {
        "name": "Health and readiness Checks",
        "description": "All components in a cloud-native system should enable health and readiness checks so that unhealthy components can be quickly identified and fixed and communication is carried out only between healthy and ready components. Health and readiness checks can for example be dedicated endpoints of components which can be called regularly to check a component. Furthermore, health and readiness checks enable an up-to-date holistic overview of the health of a system."
    },
    "automatedInfrastructure": {
        "name": "Automated infrastructure",
        "description": "Infrastructure provisioning and management should be automated as much as possible to reduce the operational effort. That means infrastructure should be created automatically when needed, kept up-to-date automatically while in use, and removed automatically once not needed anymore. Ideally it should be combined with components deployments so that no explicit infrastructure management is needed for a component deployment."
    },
    "useInfrastructureAsCode": {
        "name": "Use infrastructure as code",
        "description": "To avoid manual infrastructure operation and configuration, the infrastructure requirements and constraints should be defined (coded) independently of the actual runtime in a storable format. That way a defined infrastructure can be automatically provisioned repeatedly and ideally on different underlying infrastructures (cloud providers) based on the stored infrastructure definition."
    },
    "dynamicScheduling": {
        "name": "Dynamic scheduling",
        "description": "Resource provisioning to deployed components should be dynamic and automated so that every component is ensured to have the resources it needs and only that many resources are provisioned wich are really needed at the same time. This requires dynamic adjustments to resources to adapt to changing environments. This capability should be part of the used infrastructure."
    },
    "limitedRequestTraceScope": {
        "name": "Limited request trace scope",
        "description": "A request that requires the collaboration of several services should still be limited to as few services as possible, because otherwise services become more dependent on each other the more they need to collaborate to handle requests."
    },
    "logicalGrouping": {
        "name": "Logical grouping",
        "description": "To increase the independence of services, services should also be grouped so that services which are related are in the same group, but services which are independent are separated further. That way a separation can also be achieved on the network and infrastructure level by separating independent service groups more strictly. Potential impacts of a compromised or misbehaving service can therefore be reduced to the group to which it belongs but other groups are unaffected."
    },
    "backingServiceDecentralization": {
        "name": "Backing service decentralization",
        "description": "By assigning different backing services to different components a decentralization can be achieved which makes components more independent. For example, instead of one message broker for a whole system, several message brokers can be used, each for a group of components that are interrelated. A problem in one messaging broker has an impact on only those components using it, but not on components having separate message brokers."
    },
    "managedInfrastructure": {
        "name": "Managed infrastructure",
        "description": "Infrastructure such as basic computing, storage or network resources can be managed by a cloud provider to ensure a stable functioning and up-to-date functionalities. Responsibility is transferred, operational overhead is reduced and costs can be made more flexible because providers and vendors can provide a usage-based pricing."
    },
    "managedBackingServices": {
        "name": "Managed backing services",
        "description": "Especially backing services that provide non-business functionality can be operated and managed by vendors to ensure a stable functioning and up-to-date functionalities. This reduces operational overhead and costs can be made more flexible because vendors can provide a usage-based pricing."
    },
    "serviceReplication": {
        "name": "Service replication",
        "description": "In a cloud-native application services and therefore their provided functionalities should be replicated across different locations so that the latency for accesses from different locations is minimized and the incoming load can be distributed among replicas."
    },
    "horizontalDataReplication": {
        "name": "Horizontal data replication",
        "description": "Data should be replicated horizontally, that means duplicated across several instances of a storage backing service so that a higher load can be handled and replicas closer to the service where data is needed can be used to reduce latency."
    },
    "verticalDataReplication": {
        "name": "Vertical data replication",
        "description": "Data should be replicated vertically, that means across a request trace so that it is available closer to where a request initially comes in. Typically caching is used for vertical data replication."
    },
    "shardedDataStoreReplication": {
        "name": "Sharded data store replication",
        "description": "Data should be sharded, that means split into several storage backing service instances by a reasonable strategy so that requests can be distributed across shards to increase performance. One storage backing service instance is then less likely to be overloaded with requests."
    },
    "resourceLimits": {
        "name": "Resource limits",
        "description": "For all components the maximum amount of resources a component can consume should be limited based on its predicted needs so that resources can be provisioned efficiently. That means a component gets the resources that it needs, but not more than necessary. By making the resource requirements explicit, for example in a configuration file, these limits can be enforced by the infrastructure."
    },
    "built-InAutoscaling": {
        "name": "Built-in autoscaling",
        "description": "In a cloud-native application, autoscaling of components should be automated and built-in into the infrastructure to reduce the operational effort for scaling. Autoscaling should be based on appropriate rules so that resource utilization is optimized."
    },
    "infrastructureAbstraction": {
        "name": "Infrastructure abstraction",
        "description": "In a cloud-native application the used infrastructure should be abstracted by clear boundaries to decouple the system from physical hardware or also virtual hardware to minimize the effort and risk involved with managing infrastructure. For example, when a container orchestration system is provided, the system should be operable on that level of abstraction. Problems with hardware or VMs are handled transparently by the provider."
    },
    "cloudVendorAbstraction": {
        "name": "Cloud vendor abstraction",
        "description": "In a cloud-native application the infrastructure and backing services offered by a cloud vendor and used by a system should be based on unified or standardized interfaces so that vendor specifics are abstracted and a system could potentially be transferred to a another cloud vendor."
    },
    "configurationStoredInSpecializedServices": {
        "name": "Configuration stored in specialized services",
        "description": "By storing configuration values in specialized backing services and not only environment variables for example, changing configurations at runtime is facilitated and can be enabled by connecting components to such specialized backing services and checking for updated configurations at runtime. Additionally, configurations can be stored once, but accessed by different components."
    },
    "immutableArtifacts": {
        "name": "Immutable artifacts",
        "description": "Infrastructure and services of a cloud-native application should be defined and described in its entirety at development time so that artifacts are immutable at runtime. This means upgrades are introduced at runtime through replacement instead of modification. Furthermore components do not differ across environments and in case of replication all replicas are identical to avoid unexpected behavior."
    },
    "physicalDataDistribution": {
        "name": "Physical data distribution",
        "description": "Data storage for Data aggregates should be distributed across physical locations (e.g. availability zones) to ensure availability even in the case of data center failures."
    },
    "physicalServiceDistribution": {
        "name": "Physical service distribution",
        "description": "Components should be distributed through replication across physical locations (e.g. availability zones) to ensure availability even in the case of data center failures."
    },
    "rollingUpgradesEnabled": {
        "name": "Rolling upgrades enabled",
        "description": "If the infrastructure on which components of a cloud-native application are deployed provides the ability for rolling upgrades, upgrades can be performed seamlessly in an automated manner with reduced effort. Seamlessly means that upgrades of components do not necessitate planned downtime."
    },
    "retriesForSafeInvocations": {
        "name": "Retries for safe invocations",
        "description": "Links that are safe to invoke multiple times without leading to unintended state changes, should be retried in case of failures to automatically handle transient faults in communication. That way faults can be prevented from being propagated higher up in the request trace."
    },
    "circuitBreakedCommunication": {
        "name": "Circuit breaked communication",
        "description": "If a link is broken for an extended time, a circuit breaker can help to avoid unnecessary communication and therefore waiting time, because it does not perform communication which is known to fail. Instead, an error response is immediately returned or a default response is given, if possible."
    },
    "automatedRestarts": {
        "name": "Automated restarts",
        "description": "In a cloud-native application, when a component is found to be unhealthy, it should be automatically and directly restarted so that a recover from failures is possible. Ideally this capability should be provided by the infrastructure."
    },
    "api-BasedCommunication": {
        "name": "API-based communication",
        "description": "In a cloud-native application services should offer well-defined, standardized, documented, and declarative APIs for communication. Communication should happen only via such APIs and can be both synchronous or asynchronous."
    },
    "contract-Based": {
        "name": "Contract-based",
        "description": "By defining contracts for links, changes to endpoints can be evaluated by their impact on the contract and delayed when a contract would be broken. That way consumers of endpoints can adapt to changes when necessary."
    },
    "mediatedCommunication": {
        "name": "Mediated communication",
        "description": "By mediating communication links through additional components, there is no direct dependence on the other communication partner and additional operations can be performed to manage the communication, also in a centrally and consistently configurable way. Such operations can for example be access control, load balancing, retries, or monitoring."
    },
    "addressingAbstraction": {
        "name": "Addressing abstraction",
        "description": "By abstracting from specific addresses for reaching other components, address changes can be handled automatically without impacting the link between components. This can be achieved for example through service discovery where components are addressed through abstract service names and specific addresses are resolved through service discovery."
    },
    "communicationPartnerAbstraction": {
        "name": "Communication partner abstraction",
        "description": "By abstracting from specific components as linked communication partners, components are further decoupled and don't need to exist at the same time for communication. An example is event-driven communication where events are published to channels and can also be received by components which are created later in time."
    }
};
