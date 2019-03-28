<template>
  <div :class="[classList, 'shipping-child']">
    <div class="shipping-image"></div>
    <h4 class="shipping-header">{{ data.title }}</h4>
    <div class="shipping-body">
      <p v-if="data.cost">Cost: {{ data.cost }}</p>
      <p v-if="data.thermal">Thermal Coupling: {{ data.thermal }}</p>
      <p>{{ data.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgUrl() {
      return require(this.data.img);
    },
    classList() {
      return `${this.data.class}`;
    }
  }
};
</script>
<style lang="scss">
.shipping-child {
  box-sizing: border-box;
  padding: 20px 40px;
  width: calc(33% - 40px);
}
.shipping-image {
  padding: 40px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  img {
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
  }
}

.left-align {
  h4,
  p {
    text-align: left;
  }
  .shipping-image {
    background-position: left;
  }
}
.homepage {
  h4 {
    font-size: 20px;
  }
  p {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
