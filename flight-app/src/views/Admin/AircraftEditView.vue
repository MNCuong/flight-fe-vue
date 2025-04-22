<template>
    <AircraftForm :id="$route.params.id" />
  </template>
  
  <script>
  import AircraftForm from '../../components/AircraftForm.vue';
  export default { components: { AircraftForm } };
  </script>
  