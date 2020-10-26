import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'

import MyPopup from "../util/MyPopup";

const PlayButton = ({ title }) => {
  return (
    <MyPopup content={"Play this quiz?"}>
      <Button as={Link} to={`/quiz/${title}`} basic icon color="orange">
        <Icon name="chevron circle right" style={{ margin: 0 }} />
      </Button>
    </MyPopup>
  );
};

export default PlayButton