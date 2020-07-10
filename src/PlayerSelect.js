import React from 'react';
import {FormControl, MenuItem, Select, InputLabel} from '@material-ui/core/';

class PlayerSelect extends React.Component {
    render() {
        return(
            <div>
                <h3>How many players?</h3>
                <FormControl >
                    <InputLabel id="player-select-label">Players</InputLabel>
                    <Select
                    labelId="player-select-label"
                    id="player-select"
                    value={playerCount}
                    onChange={handleChange}
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}