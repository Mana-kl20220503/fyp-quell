<template>
  <div class="px-4">
    <h2 class="mt-12 pd-2 border-b border-custom-blue px-4 font-ultra text-xl">
      Latest Health News
    </h2>
  </div>
  <div class="container mx-auto px-5 py-8 font-worksans w-4/5">
    <router-link to="/health/articles/1">
      <div
        class="bg-white hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer gap-4 mb-10"
      >
        <img
          src="@/assets/article1_header.jpg"
          alt="vape"
          class="rounded-lg w-1/3 h-auto max-h-40 object-cover"
        />
        <div class="flex flex-col mx-3 my-2">
          <h5 class="font-bold">
            Vapes '95% safer' than cigarettes messaging backfired
          </h5>
          <p>
            The message that vaping is 95% safer than smoking has backfired,
            encouraging some children to vape, says a top health expert...
          </p>
        </div>
      </div>
    </router-link>

    <router-link to="/health/articles/2">
      <div
        class="bg-white hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer gap-4 mb-10"
      >
        <img
          src="@/assets/article2_header.jpg"
          alt="vape"
          class="rounded-lg w-1/3 h-auto max-h-40 object-cover"
        />
        <div class="flex flex-col mx-3 my-2">
          <h5 class="font-bold">
            Chemicals in vapes could be highly toxic when heated
          </h5>
          <p>
            Compounds produced by heating some fruit-flavoured vape liquids have
            implications for lung and cardiovascular disease and cancer...
          </p>
        </div>
      </div>
    </router-link>

    <router-link to="/health/articles/3">
      <div
        class="bg-white hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer gap-4"
      >
        <img
          src="@/assets/article3_header.jpg"
          alt="vape"
          class="rounded-lg w-1/3 h-auto max-h-40 object-cover"
        />
        <div class="flex flex-col mx-3 my-2">
          <h5 class="font-bold">
            RCSI research warns of hazardous health risks from flavoured
          </h5>
          <p>
            New RCSI research has uncovered the potentially harmful substances
            that are produced when e-liquids in vaping devices are heated for
            inhalation...
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import ArticlePageView1 from '@/views/HealthInfo/ArticlePageView1.vue';
import ArticlePageView2 from '@/views/HealthInfo/ArticlePageView2.vue';
import ArticlePageView3 from '@/views/HealthInfo/ArticlePageView3.vue';
</script>
