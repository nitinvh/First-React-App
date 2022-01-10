import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './listGroup';
import {getGenres} from '../services/fakeGenreService';
import { filter } from 'lodash';
import MoviesTable from './movieTables';


class Movies extends Component {
    constructor() {
        super();
        let like=0;
    }
    state = {
        movies: getMovies(),
        genre : [],
        pageSize : 5,
        currentPage : 1,
        currentGenre: { name: "All Genres" }
    };
    componentDidMount(){
        const genre = [{name:"All Genres"}, ...getGenres()];
        this.setState({genre});
    }
    handleDelete = (movie) => {
        const movies = this.state.movies.filter( m => (m._id !== movie._id));
        return this.setState({movies:movies});
    }
    handlePageChange = (p) => {
        return this.setState({currentPage: p});
    };
    handleGenreSelect = (g) => {
       return  this.setState({currentGenre: g, currentPage:1});
    }
    render() {
        const {movies: allMovies, currentPage,pageSize} = this.state;
        if(this.state.movies.length === 0){
            return <p className='text-center text-danger display-4 mt-5'>No Data available in Database...All are Deleted</p>
        } 
        const filtered = this.state.currentGenre && this.state.currentGenre._id ? allMovies.filter(m => (m.genre._id === this.state.currentGenre._id)) : allMovies;
        const movies = paginate(filtered,currentPage,pageSize); //to paginate the required movies
        return (
            <div className='container text-center mt-5'>
                <div className="row">
                    <div className="col-2" style={{marginTop:210}}>
                        <ListGroup items={this.state.genre} onGenreSelect={this.handleGenreSelect} onCurrentGenre={this.state.currentGenre} />
                    </div>
                    <div className="col">
                        <p className='text-center m-5 text-info pb-5 display-4'>{filtered.length} Movies Available</p>
                        <MoviesTable movies={movies} onDelete={this.handleDelete} />
                        <Pagination itemsCount={filtered.length} pageSize={this.state.pageSize} onPageChange={this.handlePageChange} currentPage={this.state.currentPage}  /> 
                    </div>
                </div>
          </div>
        );
    }
}
 
export default Movies;