import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Card from './card';
import { fetchPlaces, currentPage } from '../actions';
import noImg from '../components/imgs/no_image_thumb.gif';

class SearchList extends Component {
    componentDidMount() {
        const addressArray = this.props.match.url.split('/');
        this.props.currentPage([this.props.match.params.searchQuery, addressArray[5]]);
        let query = null;
        switch(addressArray[4]) {
            case 'entertainment':
                query = 'nightlife';
                break;
            case 'food':
                query = 'eatingout';
                break;
            case 'sightseeing':
                query = 'sightseeing';
                break;
            default:
                query = '';
                break;
        }
        this.props.fetchPlaces(addressArray[3], query);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const addressArray = this.props.match.url.split('/');
            this.props.currentPage([this.props.match.params.searchQuery, addressArray[5]]);
            let query = null;
            switch(addressArray[4]) {
                case 'entertainment':
                    query = 'nightlife';
                    break;
                case 'food':
                    query = 'eatingout';
                    break;
                case 'sightseeing':
                    query = 'sightseeing';
                    break;
                default:
                    query = '';
                    break;
            }
            this.props.fetchPlaces(addressArray[3], query);
        }
    }

    handlePageClick(e) {
        this.props.currentPage(e);
    }

    pagination() {
        const addressArray = this.props.match.url.split('/');
        if(!this.props.poi) {
            return <p></p>;
        }

        let numOfPages = Math.ceil(this.props.poi.results.length/5);
        let pages = [];

        for(let i = 1; i <= numOfPages; i++) {
            pages.push(i);
        }

        return pages.map((page) => {
            return(
                <li className='page-item' key={page}>
                    {/*<Link className='page-link' to={`/buildsearch/search/${addressArray[3]}/${this.props.match.params.searchQuery}/${page}`} key={page} onClick={() => this.handlePageClick(page)}>{page}</Link>*/}
                    <Link className='page-link' to={`/buildsearch/search/${addressArray[3]}/${this.props.match.params.searchQuery}/${page}`} key={page} onClick={() => this.handlePageClick([this.props.match.params.searchQuery, page])}>{page}</Link>
                </li>
            )
        })
    }

    list() {
        if(!this.props.poi) {
            return (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            )
        }

        const currentStart = (this.props.currentSearchPage[1]-1)*5;
        const currentEnd = this.props.currentSearchPage[1]*5;
        const tempArray = this.props.poi.results.slice(currentStart, currentEnd);

        return tempArray.map((place, index) => {
            const image = place.images.length === 0 ? noImg : place.images[0].source_url;
            return <Card key={index} title={place.name} text={place.snippet} img={image} info={place} tag_label={this.props.match.params.searchQuery} />
        });
    }

    render() {
        console.log(this.props.currentSearchPage);
        const addressArray = this.props.match.url.split('/');
        let lastPage = null;
        if(!this.props.poi) {
            lastPage = null;
        } else {
            lastPage = Math.ceil(this.props.poi.results.length/5);
        }

        return(
            <div className="container">
                <div className="card-grid">
                    { this.list() }
                </div>
                <nav className='mx-auto'>
                    <ul className='pagination pagination-md justify-content-center'>
                        <li className={`page-item ${this.props.currentSearchPage[1] === 1 ? 'disabled' : ''}`}>
                            <Link className='page-link' to={`/buildsearch/search/${addressArray[3]}/${this.props.match.params.searchQuery}/${Number(this.props.currentSearchPage[1])-1}`} onClick={() => this.handlePageClick(Number(this.props.currentSearchPage[1])-1)}>&laquo;</Link>
                        </li>
                        { this.pagination() }
                        <li className={`page-item ${this.props.currentSearchPage[1] === lastPage ? 'disabled' : ''}`}>
                            <Link className='page-link' to={`/buildsearch/search/${addressArray[3]}/${this.props.match.params.searchQuery}/${Number(this.props.currentSearchPage[1])+1}`} onClick={() => this.handlePageClick(Number(this.props.currentSearchPage[1])+1)}>&raquo;</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        poi: state.cityplaces.poi.data,
        currentSearchPage: state.currentPage.page
    }
}

export default connect(mapStateToProps, { fetchPlaces, currentPage })(SearchList);