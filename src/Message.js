// Message.js
import React from 'react';

export default function Message({ role, content }) {
    const isUser = role === 'user';
    return (
        <div>
            {isUser && <div className='mt-2 flex justidy-end'>
                <div className='message-bubble user-bubble'>
                    
                <strong>你: </strong>
                {content}
                </div>
            </div>
            }
            {!isUser && <div className='mt-2 message-bubble ai-bubble'>
                <strong>專家: </strong>
                {content}
            </div>}

        </div>
    );
}
