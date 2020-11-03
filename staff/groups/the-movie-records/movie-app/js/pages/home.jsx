const {Component} = React;

class Home extends Component{
constructor(){
     super()
     this.state = {resultSearch: [], searchUsed: false}
}

componentWillMount() {
    retrieveNewMovies(1,"es", (error,newMovies) => {
        if (error) return alert(error.message)
        
        this.setState({ newMovies })
    })
    retrieveUpcomingMovies(1,"es", (error,upcomingMovies) => {
        if (error) return alert(error.message)
        
        this.setState({ upcomingMovies })
    })
}

 __handleResult = (resultSearch) => {this.setState({resultSearch, searchUsed: true})}
 __renderResult (){
     return this.state.resultSearch.results.length === 0 ? <NoResult /> : <ResultList movies = {this.state.resultSearch.results} />
 }

 __renderSlider(){
     return <>
        {this.state.newMovies  && <Slider title = "Cartelera de cine"  items = {this.state.newMovies}  />}
        {this.state.upcomingMovies && <Slider title = "Novedades"  items = {this.state.upcomingMovies}  />} 
     </>
 }
/* handleNewMovies = () => {retrieveNewMovies (function(pages, language, callback))} */
render(){
    return <>
        <Header />
        <Discover />
        <Search  onResult = {this.__handleResult}/>
    

       
         {this.state.searchUsed ? this.__renderResult(): this.__renderSlider()

         }
        <Footer /> 
        </>



}
}