// src/components/abhiyan/ui/StoryCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Star, Zap, User, Tag } from 'lucide-react';

const categoryIcons: { [key: string]: React.ElementType } = {
    'Success Story': Star,
    'Innovation': Zap,
    'Testimonial': User,
    'Branding': Tag,
};

export const StoryCard = ({ story }: { story: any }) => {
    const Icon = categoryIcons[story.category] || Star;
    return (
        <Card className="flex flex-col h-full hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-start gap-3">
                    <Icon className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        {story.title}
                        <p className="text-xs font-normal text-muted-foreground mt-1">{story.category} from {story.block}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{story.description}</p>
            </CardContent>
            <CardFooter>
                <a href={story.mediaLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
                    View Media
                </a>
            </CardFooter>
        </Card>
    );
};