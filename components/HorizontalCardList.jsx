import React from 'react';
import { ScrollView } from 'react-native';

export default function HorizontalCardList({ cards,eventsFavorites = [],eventsFollowed = [], nbSubscribedForEachEvent = [], ratio = [], CardComponent, style,fetchSingleEvent }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.scrollContainer}>
            {cards.map((card) => {
                const eventSubscribed = nbSubscribedForEachEvent.length > 0 
                    ? nbSubscribedForEachEvent.find(event => event.id === card.id) 
                    : null;
                const subscribersCount = eventSubscribed ? eventSubscribed.subscribers : 0; 

                const ratioEvents = ratio.length > 0 
                    ? ratio.find(event => event.id === card.id) 
                    : null;

                    const ratioEvent = ratioEvents && ratioEvents.ratio !== null 
                    ? Math.round(ratioEvents.ratio * 5 * 100) / 100 
                    : 0;                

                const favoriteEvent = eventsFavorites.find((fav) => {return fav.event_id === card.id});
                const isFavorite = favoriteEvent ? favoriteEvent.is_favorite : false;

                const eventFollowed = eventsFollowed.find((follow) => {return follow.event_id === card.id});
                const isFollow = eventFollowed ? true : false;

                return (
                    <CardComponent
                        key={card.id}
                        card={card}
                        nbSubscribed={subscribersCount}
                        style={style}
                        subscribersCount={subscribersCount}
                        ratio={ratioEvent}
                        isFavorite={isFavorite}
                        isFollow={isFollow}
                        fetchSingleEvent={fetchSingleEvent}
                    />
                );
            })}
        </ScrollView>
    );
}
