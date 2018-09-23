import React, {Component} from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const opts = {
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        cc_load_policy: 1,
    },
};

export class YoutubePlayer extends Component {
    constructor(props) {
        super(props);
        if (this.props.width)
            opts.width = this.props.width;

    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        return (
            <YouTube
                videoId={this.props.videoId}
                opts={opts}
                onReady={this._onReady}
            />
        );
    }
}

YoutubePlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
};

export default YoutubePlayer;
