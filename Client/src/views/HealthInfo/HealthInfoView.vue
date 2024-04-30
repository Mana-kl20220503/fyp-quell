<template>
  <div class="px-4">
    <h2 class="mt-12 pd-2 border-b border-custom-blue px-4 font-ultra text-xl">
      Latest Health News
    </h2>
  </div>
  <div class="container mx-auto px-40 py-8 font-worksans">
    <router-link to="/health/articles/1">
      <div
        class="bg-white hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer"
      >
        <div>
          <img
            src="@/assets/vape3.jpg"
            alt="vape"
            class="mx-1 my-1 rounded-lg"
          />
        </div>
        <div class="mx-3">
          <h5 class="font-bold">Vape is not good for your health</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sunt
            quaerat nostrum reprehenderit illum placeat quas quod ad culpa ea,
            quisquam nesciunt iure facilis doloribus ex? Nobis sequi, excepturi
            ullam consequuntur esse vel nisi voluptatum commodi, vitae rem
            eligendi ea.
          </p>
        </div>
      </div>
    </router-link>

    <router-link to="/health/articles/2">
      <div
        class="bg-white hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer mt-12"
      >
        <div>
          <img
            src="@/assets/smoke2.jpg"
            alt="vape"
            class="mx-1 my-1 rounded-lg"
          />
        </div>
        <div class="mx-3">
          <h5 class="font-bold">Vape is not good for your health</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sunt
            quaerat nostrum reprehenderit illum placeat quas quod ad culpa ea,
            quisquam nesciunt iure facilis doloribus ex? Nobis sequi, excepturi
            ullam consequuntur esse vel nisi voluptatum commodi, vitae rem
            eligendi ea.
          </p>
        </div>
      </div>
    </router-link>

    <router-link to="/health/articles/3">
      <div
        class="bg-white hover:bg-gray-300 active:bg-gray-400 rounded-lg overflow-hidden shadow-custom active:shadow-custom_active border border-black flex items-center transition-colors duration-300 cursor-pointer mt-12"
      >
        <div>
          <img
            src="@/assets/vape2.jpg"
            alt="vape"
            class="mx-1 my-1 rounded-lg"
          />
        </div>
        <div class="mx-3">
          <h5 class="font-bold">Vape is not good for your health</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sunt
            quaerat nostrum reprehenderit illum placeat quas quod ad culpa ea,
            quisquam nesciunt iure facilis doloribus ex? Nobis sequi, excepturi
            ullam consequuntur esse vel nisi voluptatum commodi, vitae rem
            eligendi ea.
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
