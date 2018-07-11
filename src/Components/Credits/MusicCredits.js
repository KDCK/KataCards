import React from 'react'
import ReactPlayer from 'react-player'
import { Button, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './credits.css'

const MusicCredits = () => {
  return (
    <div className="credits-body">
      <ReactPlayer
        style={{ display: 'none' }}
        url='https://www.youtube.com/watch?v=jbUg8lEKOBs'
        playing
        loop
      />
      <div className="container">
        <div className="credits">
          <h1>Created by KDCK</h1>
          <span>
            Kathleen Lopez, Daniel Howard, Chris Ardeljan, Kenneth Zhu
          </span>
          <h1>This game is not for commercial use, all art and music is meant as a place holder for our student project. Please see the following links for more information about the artists we've included in our project:</h1>
          <List>
            <List.Item>
              <List.Icon name="male" />
              <List.Content>Darren Curtis - DesperateMeasurez</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=CrkS-Z-TACE">
                  https://www.youtube.com/watch?v=CrkS-Z-TACE
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=_6PSz6Aj8R0">
                  https://www.youtube.com/watch?v=_6PSz6Aj8R0
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=P2pBVwZNkH8">
                  https://www.youtube.com/watch?v=P2pBVwZNkH8
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=yHqOzzxgC-U">
                  https://www.youtube.com/watch?v=yHqOzzxgC-U
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=5F2QDwqDLWU">
                  https://www.youtube.com/watch?v=5F2QDwqDLWU
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="male" />
              <List.Content>Tim Walther - Kammerton</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=jbUg8lEKOBs">
                  https://www.youtube.com/watch?v=jbUg8lEKOBs
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="male" />
              <List.Content>Carbon Maestro</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=RSREapeetNE">
                  https://www.youtube.com/watch?v=RSREapeetNE
                </a>
              </List.Content>
            </List.Item>
          </List>

          <Link to="/home">
            <Button color="red" className="home-button-deck" waves="purple">
              Back to Kata Cards
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MusicCredits

