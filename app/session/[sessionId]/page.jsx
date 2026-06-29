import SessionDetail from '../components/SessionDetail';

export default async function SessionPage({ params }) {
    const { sessionId } = await params;
    const eventId = 1;
    return <SessionDetail sessionId={sessionId} eventId={eventId} />;
}