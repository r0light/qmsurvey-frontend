<script setup lang="ts"></script>

<template>
  <div class="welcome">
    <h1>
      Hello and thank you for your willingness to participate in this survey!
    </h1>

    <p class="newParagraph"></p>
    <p class="newParagraph mainInfo">
      The aim of this survey is to investigate the <span class="bold">impact</span> of different <span class="bold">product factors</span> of a cloud-native software system on <span class="bold">software quality</span>. 
    </p>
    <p class="newParagraph mainInfo">
      Product factors are properties of a software system which characterize the way it is implemented and deployed. Product factors can also be the result of applying certain patterns or practices.
    </p>
    <p class="newParagraph mainInfo">
      Your task is to decide for individual product factors how they impact software quality aspects.
      The <span class="bold">example on the next page </span> shows you how to do that.
    </p>

    <p class="newParagraph detailInfo">
      The survey is part of our general effort of creating a quality model for cloud-native application architectures, focusing on design time aspects. 
      With the survey, we want to empirically investigate relationships within the model.
      We are looking for software and IT professionals (developers, engineers, architects) who have experience with implementing web-based applications that run in the cloud. <br>
      All responses are collected anonymously and we only ask for basic demographic data at the end of the survey which is voluntary to enter.
      Collected data in aggregated form will possibly be included in publications such as research reports, articles, and dissertations.
    </p>


    <!--
    <div class="termsDescription">
      <p>
        We try to rely on a consistent set of terms to describe product factors, therefore please also read the following description of terms:
      </p>
      <br />
      <p>
        A cloud-native application is referred to in general as a
        <em>System</em>. A <em>System</em> is composed of <em>Components</em>. A
        <em>Component</em> is a distinguishable part of the system and
        refers to an executable and addressable unit. Therefore, a
        <em>Component</em> can be a <em>Service</em> that implements and provides
        business functionality or a <em>Backing Service</em> that provides general
        functionality needed by other <em>Components</em>, e.g., messaging, load
        balancing, logging. A special case of a <em>Backing Service</em> is a
        <em>Storage Backing Service</em> intended to describe databases of
        different types. <em>Components</em> provide <em>Endpoints</em> as part of
        their interfaces and <em>Components</em> are connected via
        <em>Links</em> that connect a <em>Component</em> with an
        <em>Endpoint</em> of another <em>Component</em>. A special case of an
        <em>Endpoint</em> is an <em>External Endpoint</em> that is available to
        the public. Finally, <em>Components</em> are deployed on
        <em>Infrastructure</em> which is an abstract element to describe the
        different possibilities for deploying software, e.g., a VM from an
        Infrastructure as a Service (IaaS) offering, a Container Orchestration
        Engine managed by a cloud provider, a Platform as a Service (PaaS)
        offering.
      </p>
    </div>
    -->

    <p class="newParagraph screenHint">
      <span class="bold">For a good user experience of the survey tool, please maximize your browser window</span>
    </p>
  </div>
</template>

<style>
.welcome {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem 0 1rem;
}

.newParagraph {
  margin-top: 1em;
}

.bold {
  font-weight: bold;
}

.mainInfo {
  font-size: 1.2em;
}

.detailInfo {
  font-size: 1em;
  background-color: #f2f2f2;
  border: #000 solid 1px;
  border-radius: 3px;
  margin: 25px 0 5px 0;
  padding: 0.2em;
}

.termsDescription {
  font-size: 1em;
  background-color: #f2f2f2;
  border: #000 solid 1px;
  border-radius: 5px;
  margin: 25px 0 5px 0;
  padding: 0.2em;
}


@media (min-width: 1280px) {
  .screenHint {
    display: none;
  }
}

</style>
