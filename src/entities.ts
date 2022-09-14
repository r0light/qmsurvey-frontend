export function addTooltips(factorDescription: string): string {
    for (const [entityKey, entity] of Object.entries(entities)) {
        let name: string = entity.name;
        let description: string = entity.description;
        factorDescription = factorDescription.replace(new RegExp(`(${name})(?![^<]*>|[^<>]*</)`, 'gi'), `<span class="tooltip" data-tooltip="${description}"><em>$&</em></span>`)
    }
    return factorDescription;
}

const entities = {
    system: {
        name: "System",
        description: "System describes a cloud-native application as a whole. It is composed of Components which can be connected via links. Components can be deployed on infrastructure indicated by deployment mappings."
    },
    component: {
        name: "Component",
        description: "A Component is an abstract description for a part of the system and refers to an executable and addressable unit. A Component can be a Service that implements and provides business functionality or a Backing Service that provides general functionality needed by other Components, e.g., messaging, load balancing, logging, but also data storage."
    },
    service: {
        name: "Service",
        description: "A Service is a component that implements business functionality and provides it via an interface to other components."
    },
    backingService: {
        name: "Backing Service",
        description: "A Backing Service is a component that provides general functionality needed by other components, e.g., messaging, load balancing, logging."
    },
    storageBackingService: {
        name: "Storage Backing Service",
        description: "A Storage Backing Service is a special case of a Backing Service that describes databases and is therefore explicitly stateful."
    },
    endpoint: {
        name: "Endpoint",
        description: "An Endpoint is a communication endpoint and part of the interface of a Component. It can for example be a REST endpoint or a message producer or listener."
    },
    externalEndpoint: {
        name: "External Endpoint",
        description: "An External Endpoint is a special case of an Endpoint that is made available to the public."
    },
    link: {
        name: "Link",
        description: "A Link describes the connection between two components, in the sense that it connects one component with an endpoint of another component. It means that this component communicates with this endpoint at runtime."
    },
    infrastructure: {
        name: "Infrastructure",
        description: "Infrastructure is an abstract element to describe the different possibilities for deploying software, e.g., a VM from an Infrastructure as a Service offering, a Container Orchestration Engine managed by a cloud provider, a Platform as a Service offering. Several components can be deployed on one infrastructure element."
    },
    deploymentMapping: {
        name: "Deployment Mapping",
        description: "A Deployment mapping describes the connection between a Component or Infrastructure and its (underlying) infrastructure."
    },
    requestTrace: {
        name: "Request Trace",
        description: "A Request trace is the whole resulting trace of a service invocation from the outside as a collection of components and links"
    },
    dataAggregate: {
        name: "Data Aggregate",
        description: "A Data Aggregate is an abstract description of a type of business object that is processed and persisted by Components."
    },
    backingData: {
        name: "Backing Data",
        description: "Backing Data refers to non-business data, e.g., config values, secrets, logs, metrics"
    }
};