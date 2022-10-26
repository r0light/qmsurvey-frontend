<script setup lang="ts"></script>

<template>
  <div class="welcome">
    <div class="logos">
      <img src="/logo-bamberg.png" alt="University of Bamberg Logo"/>
      <img src="/logo-stuttgart.png" alt="University of Stuttgart Logo"/>
    </div>
    <h1>
      Hello <font-awesome-icon icon="fa-regular fa-face-smile" />
    </h1>

    <p class="newParagraph"></p>
    <p class="newParagraph mainInfo">
      Thank you for your willingness to participate in this survey! 
    </p>
    <p class="newParagraph mainInfo">
      We are software engineering researchers from the universities of Bamberg and Stuttgart (Germany).
    </p>
    <p class="newParagraph mainInfo">
      Currently, we are investigating how different <span class="bold">product factors</span> of a <span class="bold">cloud-native software system</span> impact software quality.
    </p>
    <p class="newParagraph mainInfo">
      Product factors are properties of a software system which characterize the way it is implemented and deployed. Product factors can also be the result of applying certain patterns or practices.
    </p>
    <p class="newParagraph mainInfo">
      We ask you to rate, how individual product factors impact software quality aspects. We show an example on the next page.
    </p>
    <p class="newParagraph mainInfo">
      For every completion of the survey, we donate 2€ (in equivalent £) to <a href="https://codeclub.org">Code Club</a> <span><a href="https://codeclub.org"><img class="inline-logo" src="/codeclub.png" alt="Code Club Logo"/></a></span>
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
      <span class="bold">Hint: For a good user experience of the survey tool, please maximize your browser window</span>
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

.logos {
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  column-gap: 20px;
}

.logos img {
  width: 100%;
  min-width: 50px;
  max-width: 120px;
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

.inline-logo {
  max-width: 60px;
  vertical-align: middle;
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
