webpackJsonp([3],{"9K0F":function(t,e){},hYzl:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={components:{boardCard:o("veLy").a},props:["id"],computed:{other:function(){return this.$store.state.user.other},boards:function(){return this.$store.state.board.boards},hasMoreBoard:function(){return this.$store.state.board.hasMoreBoard}},created:function(){this.$store.dispatch("user/loadOther",this.id),this.$store.dispatch("board/loadUserBoards",{userId:this.id,reset:!0})},mounted:function(){window.addEventListener("scroll",this.onScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.onScroll)},methods:{onScroll:function(){console.log("window.scrollY:",window.scrollY),console.log("document.documentElement.clientHeight",document.documentElement.clientHeight),console.log("document.documentElement.scrollHeight",document.documentElement.scrollHeight),window.scrollY+document.documentElement.clientHeight>document.documentElement.scrollHeight-300&&this.hasMoreBoard&&this.$store.dispatch("board/loadUserBoards",{userId:this.id})}}},n={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.other?o("v-container",[o("v-card",{staticStyle:{"margin-bottom":"20px"}},[o("v-container",[t._v("\n      "+t._s(t.other.name)+"\n      "),o("v-row",[o("v-col",{attrs:{cols:"4"}},[t._v(t._s(t.other.Followings.length)+" 팔로잉")]),t._v(" "),o("v-col",{attrs:{cols:"4"}},[t._v(t._s(t.other.Followers.length)+" 팔로워")]),t._v(" "),o("v-col",{attrs:{cols:"4"}},[t._v(t._s(t.other.boards.length)+" 게시글")])],1)],1)],1),t._v(" "),o("div",t._l(t.boards,function(t){return o("board-card",{key:t.id,attrs:{board:t}})}),1)],1):t._e()},staticRenderFns:[]};var s=o("VU/8")(r,n,!1,function(t){o("9K0F")},null,null);e.default=s.exports}});
//# sourceMappingURL=3.3599f5439830196f7fa2.js.map