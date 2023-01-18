import React, { Component } from "react";
import Card from "./Card";
import "./Nav.css";
import PropTypes from 'prop-types'

export default class TopNews extends Component {
  
static defaultProps = 
{
  category : 'general'
}

static propTypes ={

category : PropTypes.string

}



  //articles = [];

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      prevCategory:this.props.category,
    };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

  }

  async componentDidMount() {
    let url1 =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6911b9ede4e749349f1ae4790c0c9552`;
    let data = await fetch(url1);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles });
    this.setState({prevCategory : this.state.category});
  }

  async componentDidUpdate(prevCategory)
  {
    if(prevCategory.category !== this.props.category )
    {
      let url1 =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6911b9ede4e749349f1ae4790c0c9552`;
    let data = await fetch(url1);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles });
    }
  }

  async handleChangeCategory ()
  {
     console.log(this.props.category);
  }

  render() {
   // console.log(this.props.category);
   function check()
   {
    console.log("jelllo");
   }

    return (
      <div>
        <h3 className="text-title">{this.props.category}</h3>
      <div className='back container'>
        {this.state.articles.map((element) => {
          return (
            <div key={element.url}>
              <Card
                title={element.title?element.title.slice(0, 50):""}
                description={element.description?element.description.slice(0, 88):""}
                ImgUrl={element.urlToImage}
                NewsUrl={element.url}

              />
            </div>
          );
        })
        }
      </div>
      </div>
    );
  }
}
