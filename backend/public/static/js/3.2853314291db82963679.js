webpackJsonp([3],{"+WiN":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={components:{boardCard:o("veLy").a},props:["tag"],computed:{boards:function(){return this.$store.state.board.boards},hasMoreBoard:function(){return this.$store.state.board.hasMoreBoard}},created:function(){this.$store.dispatch("board/loadHashtagBoards",{hashtag:this.tag,reset:!0})},mounted:function(){window.addEventListener("scroll",this.onScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.onScroll)},methods:{onScroll:function(){window.scrollY+document.documentElement.clientHeight>document.documentElement.scrollHeight-300&&this.hasMoreBoard&&this.$store.dispatch("board/loadHashtagBoards",{hashtag:this.tag})}}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-container",[e("div",this._l(this.boards,function(t){return e("board-card",{key:t.id,attrs:{board:t}})}),1)])},staticRenderFns:[]};var s=o("VU/8")(r,n,!1,function(t){o("qAev")},null,null);e.default=s.exports},qAev:function(t,e){}});
//# sourceMappingURL=3.2853314291db82963679.js.map