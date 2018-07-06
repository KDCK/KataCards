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
        url="https://www.youtube.com/watch?v=v2Ju6Q8yXR8"
        playing
        loop
      />
      <div className="container">
        <div className="credits">
          <h1>Created by KDCK</h1>
          <span>
            Kathleen Lopez, Daniel Howard, Chris Ardeljan, Kenneth Zhu
          </span>
          <h1>Credit for Music to the Following Artists:</h1>
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
              <List.Icon name="male" />
              <List.Content>Lewis Edwards</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=9p70UVWn6P8">
                  https://www.youtube.com/watch?v=9p70UVWn6P8
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="male" />
              <List.Content>AlmostAppropriate</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=v2Ju6Q8yXR8">
                  https://www.youtube.com/watch?v=v2Ju6Q8yXR8
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
            <List.Item>
              <List.Icon name="male" />
              <List.Content>Wingus Dingus</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="https://www.youtube.com/watch?v=8RatUE6kfSk">
                  https://www.youtube.com/watch?v=8RatUE6kfSk
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
