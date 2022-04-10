import './Team.css';
import { Container, Grid } from "semantic-ui-react";
import TeamMember from "./TeamMember";


export default function Team() {

    const infosGui = {
        name: 'Guillaume',
        surname: 'Carlier',
        nickname: 'Kumichiku',
        favouriteGames: ['Sea of Thieves', 'Trackmania', 'League Of Legends', 'Osu!'],
        links: {
            twitch: 'https://twitch.tv/kumichiku'
        },
        description: 'Joueur multi gaming qui parfois se perd à jouer au pirate sur la plateforme de diffusion en direct connue sous le nom de twitch.',
        participation: '35'
    }
    const infosGaston = {
        name: 'Gaston',
        surname: 'Deseine',
        nickname: 'Aslavia',
        favouriteGames: ['CSGO', 'League Of Legends', 'Rayman'],
        links: {
            twitch: 'N/A'
        },
        description: 'Joueur du dimanche, aime passer un bon moment avec les copains.',
        participation: '35'
    }
    const infosSacha = {
        name: 'Sacha',
        surname: 'Lesueur',
        nickname: 'Lotharian',
        favouriteGames: ['Red Dead Redemption 2', 'Crusader Kings 3', 'Geoguessr'],
        links: {
            twitch: 'N/A'
        },
        description: 'Fan de la première heure de la saga Red Dead Redemption, Lotharian est devenu un analyste expert en matière d’open world comme Geoguessr.',
        participation: '30'
    }

    return (
        <Container className="teamContainer">
            <Grid columns={3} centered>
                <Grid.Column>
                    <TeamMember infos={infosGui} />
                </Grid.Column>
                <Grid.Column>
                    <TeamMember infos={infosGaston} />
                </Grid.Column>
                <Grid.Column>
                    <TeamMember infos={infosSacha} />
                </Grid.Column>
            </Grid>
        </Container>
    );

}
