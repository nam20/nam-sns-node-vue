<template>
<div>
    <h1>test!!</h1>
    <router-link to="/">home</router-link>
    <input type="text" v-model="text">
    
    <button @click="testGet">test</button>
    <input type="text" v-model="search" placeholder="영화 검색" @keyup.enter="naverMovie">
    <button @click="naverMovie">movietest</button>
    <h4>{{text}}</h4>
    <h2>{{test}}</h2>
    <!-- <div v-for="movie in arr" :key="movie" style="width:390px;display:inline;margin:5px;">
        <img :src="movie.image" alt="" style="box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -7px rgba(0,0,0,0.2);">
        
    </div> -->
    <button @click="boxOffice">박스오피스</button>
    <table style="margin: 0 auto;">
        <thead>
            <th>포스터</th>
            <th>영화제목</th>
            <th>감독</th>
            <th>배우</th>
            <th>평점</th>
        </thead>
        <tbody>
            <tr v-for="movie in arr" :key="movie" style="margin:0 auto;">
                <td><img :src="movie.image" alt=""></td>
                <td>{{movie.title}}</td>
                <td>{{movie.director}}</td>
                <td>{{movie.actor}}</td>
                <td>{{movie.userRating}}</td>
            </tr>
           
        </tbody>
    </table>

    <table style="margin: 0 auto;">
        <thead>
            <th>순위</th>
            <th>영화제목</th>
            <th>개봉일</th>
            <th>전일 관객수</th>
            <th>누적 관객수</th>
        </thead>
        <tbody>
            <tr v-for="movie in boxArr" :key="movie" style="margin:0 auto;">
                <td>{{movie.rank}}</td>
                <td>{{movie.movieNm}}</td>
                <td>{{movie.openDt}}</td>
                <td>{{movie.audiCnt}}</td>
                <td>{{movie.audiAcc}}</td>
            </tr>
           
        </tbody>
    </table>
    
    <button @click="weather">날씨 ㅋㅋ</button>
    <img :src="weatherIcon" alt="">
</div>
  
</template>

<script>
import axios from 'axios'

export default {
    created(){
        
    },
    data(){
        return {
            test:'',
            text:'',
            search:'',
            arr:[],
            boxArr:[],
            weatherIcon:''
        }
    },
    methods:{
        testGet(){

            var frm = new FormData();
            
            frm.append('test2','testtext')
            


            axios({
                url:'/test',
                method:'post',
                params:{
                    name : this.text,
                    created_at: new Date()
                },
                data:{
                    test2: 'testtxet'
                },
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>{

                console.log(new Date())
                console.log(res.data);
                
                console.log(res.status);
                
                
            })
        },
        naverMovie(){
            
            axios({
                url:'/movieTest',
                method:'get',
                params:{
                    search:this.search
                }
            })
            .then(res=>{
                console.log(res.data)
                this.arr = res.data.items
                this.arr.forEach(item=>{
                    item.title = item.title.replace(/(<([^>]+)>)/ig,"")
                    item.director = item.director.replace("|","")
                })
                this.search = ''
            })
            .catch(err=>{
                console.log(err)
            })
        },
        async boxOffice(){
            function getFormatDate(date){
                var year = date.getFullYear();              //yyyy
                var month = (1 + date.getMonth());          //M
                month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
                var day = date.getDate();                   //d
                day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
                return  year + '' + month + '' + day;
            }
            var date = new Date();
            
            date.setTime(date.getTime() - (1 * 24 * 60 * 60 * 1000))
            console.log(getFormatDate(date).toString())
            try{

                let result = await axios({
                        url:'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=8cb5c33d3083de1c62ac9739bc48db4b&targetDt=' + getFormatDate(date).toString(),
                        method:'get'
                    })
                 console.log(result)   
                this.boxArr = result.data.boxOfficeResult.dailyBoxOfficeList

             }catch(err){
                 console.log(err)
             }
        },
        async weather(){
            try{

           
            let result = await axios({
                url:'http://api.openweathermap.org/data/2.5/weather?q=suwon&appid=444139fb06bf9040af8333f1639f835b',
                method:'get'
            })
            this.weatherIcon = `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png` 
            console.log(result)
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>