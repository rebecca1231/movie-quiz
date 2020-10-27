import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'

import PopupLabel from "../util/PopupLabel";

const PlayButton = ({ title }) => {
  return (
    <PopupLabel content={"Play this quiz?"}>
      <Button as={Link} to={`/quiz/${title}`} basic icon color="orange">
        <Icon name="chevron circle right" style={{ margin: 0 }} />
      </Button>
    </PopupLabel>
  );
};

export default PlayButton