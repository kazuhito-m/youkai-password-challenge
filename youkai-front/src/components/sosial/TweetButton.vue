<template lang="html">
<span>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
    <a
        href="https://twitter.com/share"
        class="twitter-share-button" 
        :data-url="nowUrl()" 
        data-text="Youkai Password Challenge" 
        data-size="large" 
        data-hashtags="隠しパスワード解析選手権">
        Tweet
    </a> 
</span>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TweetButton extends Vue {
    private nowUrl(): string {
        return window.location.href;
    }
}
</script>
