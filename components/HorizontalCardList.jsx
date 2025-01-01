import React from 'react';
import { ScrollView } from 'react-native';

export default function HorizontalCardList({ cards, nbSubscribedForEachEvent = [], ratio = [], selectedCards, toggleSelection, CardComponent, style }) {
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

                const ratioEvent = ratioEvents && ratioEvents.ratio !== null ? (ratioEvents.ratio) * 5 : 0;
                return (
                    <CardComponent
                        key={card.id}
                        card={card}
                        nbSubscribed={subscribersCount}
                        isSelected={selectedCards[card.id]} 
                        toggleSelection={() => toggleSelection(card.id)} 
                        style={style}
                        subscribersCount={subscribersCount}
                        ratio={ratioEvent}
                        
                    />
                );
            })}
        </ScrollView>
    );
}
