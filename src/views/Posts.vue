<template>
    <div v-if="store.authenticated">
        <div class="najpost">
            <h5>Post dana:</h5>
            <div @click="gotoDetails(najPost)">
                <InstagramCard :info="najPost"/>
            </div>
        </div>
        <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
            <InstagramCard :info="card" />
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { Posts } from '@/services';
import InstagramCard from '@/components/InstagramCard.vue';
import store from '@/store.js';
export default {
    data() {
        return {
            store,
            cards: [],
            najPost: {}
        };
    },
    watch: {
        'store.searchTerm': _.debounce(function(val) {
            this.fetchPosts(val);
        }, 500)
    },
    created() {
        this.fetchPosts();
    },
    name: 'posts',
    methods: {
        async fetchPosts(term) {
            term = term || store.searchTerm;
            this.najPost = await Posts.getNajPost();
            this.cards = await Posts.getAll(term);
            
        },
        gotoDetails(card) {
            this.$router.push({ path: `post/${card.id}` });
        }
    },
    components: {
        InstagramCard
    }
};
</script>

<style scoped>
button {
    margin-bottom: 20px;
}
.najpost {
    border-style: dashed
}
</style>