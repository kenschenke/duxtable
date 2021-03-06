import React from 'react';
import DuxTable from '../../src/DuxTable';

export class CellRendering extends React.Component {
    constructor(props) {
        super(props);

        this.songs = [];
        for (let i = 1; i <= 25; i++) {
            this.songs.push({
                Id: i,
                Song: this.makeSongTitle(),
                Artist: this.makeArtistName(),
                Popularity: Math.floor(Math.random()*10) + 1
            });
        }
    }

    makeArtistName = () => {
        const artists = [
            "Orchestra", "Band", "John", "Johnny", "Joe", "Creek", "River", "Super", "Little",
            "October", "Destiny", "Freaky", "Guitars", "Magic", "Hollow", "Project", "Blue",
            "Friday", "Weekend", "Night", "Party", "Lonely", "Crazy", "Monster"
        ];

        return this.randomWord(artists) + ' ' + this.randomWord(artists);
    };

    makeBars = item => {
        let bars = [];
        for (let i = 0; i < 10; i++) {
            let style = {
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 2,
                width: 5,
                height: 20,
                float: 'left',
                margin: 2
            };
            if (i <= item.Popularity) {
                style.background = 'rgba(0,0,0,0.5)';
            }
            bars.push(<div key={`${item.Id}_bars_${i}`} style={style}></div>);
        }

        return <div>{bars}</div>;
    };

    makeSongTitle = () => {
        const words = [
            "Love", "Fire", "Don't", "Rock", "Woman", "Disc", "Music", "Dancin'",
            "Baby", "Twist", "Little", "Lonely", "Blue", "Swing", "Pal", "Sweetheart", "Rose",
            "Breathe", "Yeah", "We", "Your", "Be", "With", "Little"
        ];

        return this.randomWord(words) + ' ' + this.randomWord(words);
    };

    randomWord = words => {
        return words[Math.floor(Math.random()*words.length)];
    };

    render() {
        const cols = [
            {
                field: 'Song',
                title: 'Song'
            },
            {
                field: 'Artist',
                title: 'Artist'
            },
            {
                field: 'Popularity',
                title: 'Popularity',
                render: item => this.makeBars(item),
                width: 125
            }
        ];

        return (
            <div className="example lightmode">
                <DuxTable name="cellrendering"
                          data={this.songs}
                          rowKey="Id"
                          columns={cols}
                          striped={true}
                          sortColumn={2}
                          sortAscending={false}
                />
            </div>
        );
    }
}
