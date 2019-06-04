import React, {Component} from 'react';
import IconGrid from './IconGrid.js';
import SadGhost from './sad-ghost.svg';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import {WarningAlert} from 'pivotal-ui/react/alerts';
import 'pivotal-ui/css/buttons';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      icons: []
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    let req = require.context("./icons", true, /\.svg$/);
    let icons = [];

    icons = req.keys().map(function (key) {
      let fileName = req(key).replace(/^.*[\\\/]/, '').split('.')[0];

      return {
        imageSrc: req(key),
        fileName: fileName
      };
    });

    this.setState({icons: icons});
  }

  searchUpdated(event) {
    this.setState({searchTerm: event.target.value})
  }

  clearSearch() {
    this.setState({
      searchTerm: ''
    });
  }

  handleScroll() {
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (this.iconSearchBar !== null) {
      if (top > 78) {
        this.iconSearchBar.classList.add('page-is-scrolled');
      } else {
        this.iconSearchBar.classList.remove('page-is-scrolled');
      }
    }
  }

  render() {
    let activeSearch = this.state.searchTerm;
    const filteredIcons = this.state.icons.filter(function (icon) {
      return icon.fileName.includes(activeSearch);
    });

    return (

      <main>
        <WarningAlert withIcon>This site has been deprecated. For a list of current icons, please <a
          href="https://styleguide.pivotal.io/components/icons/">visit the Pivotal UI styleguide.</a></WarningAlert>

        { this.state.navClass }
        <div id="iconSearchBar" className="icon-search-bar" ref={(ref) => this.iconSearchBar = ref}>
          <input placeholder="Search for icons" className="search-input" value={this.state.searchTerm}
                 onChange={this.searchUpdated.bind(this)}/>

        </div>
        {
          filteredIcons.length !== 0 &&
          <Grid justifyContent="center">
            <IconGrid icons={ filteredIcons } className="centered"/>
          </Grid>
        }{
        filteredIcons.length === 0 &&
        <Grid justifyContent="center">
          <FlexCol className="centered">
            <Grid justifyContent="center" flexDirection="column">
              <FlexCol>
                <img src={SadGhost} className={'empty-state-icon'} alt="empty state ghost"/>
              </FlexCol>
              <FlexCol>
                <button className="pui-btn pui-btn--brand pui-btn--flat" onClick={this.clearSearch.bind(this)}>Clear
                  Search
                </button>
              </FlexCol>
            </Grid>
          </FlexCol>
        </Grid>
      }

        <footer>
          <Grid>
            <FlexCol>
              <a href="https://github.com/pivotal-cf/pui-icons" target="_blank" className="centered">View on GitHub</a>
            </FlexCol>
          </Grid>
        </footer>
      </main>
    );
  }
}

export default App;
