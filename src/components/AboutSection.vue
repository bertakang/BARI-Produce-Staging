<template>
  <section id="recipes">
    <div class="sticky">
      <img src="../assets/images/about.jpg" alt="Description of the image">
    </div>
    <div class="scrollable">
      <div class="text-block">
        <h1>About Us</h1>
        <p>Bari Produce LLC was created to market high quality tree fruit and table grapes under the well known Bari®
          and Logoluso® brands. With Frank A. Logoluso Farms as our foundation, Bari Produce brings together other
          quality-minded growers to expand the Bari® labels and to build upon the Mr. Logoluso’s legacy.</p>
        <p>“Growing grapes is a family tradition,” says Frank Logoluso. He learned the trade from his father,
          Panteleao
          Logoluso who moved to Madera, CA from Bari, Italy around 1915.</p>
        <p>When Panteleao was a child growing up in Bari, people shopped daily in the market square to buy the
          freshest
          available produce. Frank always had fond memories of his father’s memories of the marketplace and created
          the
          Bari® label as a tribute to not only his father, but to the “old school” way of life.</p>
        <p>The Bari® brand grape label was created 60 years ago and is reserved for only the best of the best in terms
          of size, quality and taste. The Bari® brand today means the same as it did in 1948….consistent, top-quality
          fruit!</p>
        <p>Bari Produce LLC ships our produce domestically as well as internationally; reaching over 23 international
          markets. Our efforts in the field ensure consistently top-quality produce in today’s marketplace.</p>
        <p>Thank you for stopping by our website and familiarizing yourself with Bari Produce LLC. Our desire is to
          continue delivering our family touch in every piece of fruit we send across the globe.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-block {
  padding: 64px;
  line-height: 38px;
}

.sticky {
  display: flex;
  flex: 1;
  position: sticky;
  top: 0px;
  z-index: 1;
}

.scrollable {
  display: flex;
  flex: 2;
  flex-direction: column;
  background-color: #7E315D;
  padding-top: 32px;
  overflow-y: scroll;
  height: 100vh;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 667px) {
  section {
    display: flex;
    flex-direction: column;
  }

  .text-block {
  padding: 16px;
  line-height: 38px;
}


  .sticky {
    display: flex;
    position: relative;
    top: 0px;
    min-height:100vh;
  }

  .scrollable {
    display: flex;
    flex-direction: column;
    background-color: #7E315D;
    min-height:100vh;
  }

}
</style>
