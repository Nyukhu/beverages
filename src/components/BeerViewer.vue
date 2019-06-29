<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex>
                <v-data-table
                :headers="headers"
                :items="beers"
                
                class="elevation-1"
                
                
                >
                    <template v-slot:items="props">
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.ibu }}</td>
                        <td class="text-xs-center">{{ props.item.ebc }}</td>
                        <td class="text-xs-center">{{ props.item.abv }}%</td>
                        <td class="text-xs-center">{{ props.item.first_brewed }}</td>
                    </template>
                    <template v-slot:footer>
                        <td :colspan="headers.length" class="beer-viewer-center">
                            <v-switch
                                    v-model="strongBeer"
                                    :label="`only strong beers`"
                                    @change="changeSort()"
                            ></v-switch>
                            
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
        name : "BeerViewer",
        data () {
            return{
                selected: [],
                strongBeer: false,
                desserts: [
                    {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%'
                    },
                    {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%'
                    },
                    {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%'
                    },
                    {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%'
                    },
                    {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%'
                    },
                    {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%'
                    },
                    {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%'
                    },
                    {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%'
                    },
                    {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%'
                    },
                    {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%'
                    }
                ],
                headers: [
                {
                    text: 'Beer',
                    align: 'left',
                    value: 'name'
                },
                { text: 'IBU', align: 'center', value: 'ibu' },
                { text: 'EBC', align: 'center', value: 'ebc' },
                { text: 'ABV', align: 'center', value: 'abv' },
                { text: 'First Brewed',align: 'center',sortable: false, value: 'first_brewed' },
                ],
                beers: []

            }
        },
        computed: {
        },
        methods : {
            changeSort: function(){
                this.beers = [];
                if(this.strongBeer){
                    this.getBeers(1,"Strong")
                }
                else{
                    this.getBeers(1,"")
                }
            },
            getBeers: function (pageNum = 1,type) {
                this.$http
                    .get('https://api.punkapi.com/v2/beers?malt=EXtra%20Pale&page='+pageNum+'&per_page=80')
                    .then(response => {
                        console.log(response)
                        if (type == "Strong") {
                            response.data.forEach(beer => {
                                if (beer.abv >= 7.0) {
                                    let thisBeer = {
                                                name : beer.name,
                                                ibu : beer.ibu,
                                                ebc : beer.ebc,
                                                abv : beer.abv,
                                                first_brewed : beer.first_brewed
            
                                                };
            
                                    console.log(thisBeer);
                                    this.beers.push(thisBeer);
                                }
                                
                            });
                            
                        }
                        else{
                             response.data.forEach(beer => {
                                let thisBeer = {
                                                    name : beer.name,
                                                    ibu : beer.ibu,
                                                    ebc : beer.ebc,
                                                    abv : beer.abv,
                                                    first_brewed : beer.first_brewed
                
                                                    };
                                console.log(thisBeer);
                                this.beers.push(thisBeer);
                            });
                        }
                        if (response.data.length >= 80 ) {
                            this.getBeers(pageNum+1,type)
                        }
                    })

                
                     
                
            }
        },
        mounted(){
            this.getBeers(1,"")
        }
    }
</script>

<style scopped>

</style>
