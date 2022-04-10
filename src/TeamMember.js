
import { Card, List } from 'semantic-ui-react'
import TeamMemberDetails from './TeamMemberDetails'

const TeamMember = ({ infos }) => (
  <Card>
    <TeamMemberDetails
      infos={infos}
    />
    <Card.Content>
      <Card.Header>{infos.name} {infos.surname}</Card.Header>
      <Card.Meta>{infos.nickname}</Card.Meta>
      <Card.Description>
        <List>
          <List.Item>
            <List.Icon name='game' />
            <List.Content>{infos.favouriteGames[0]}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='percent' />
            <List.Content>{infos.participation}</List.Content>
          </List.Item>
        </List>
      </Card.Description>
    </Card.Content>
  </Card>
)
export default TeamMember;
