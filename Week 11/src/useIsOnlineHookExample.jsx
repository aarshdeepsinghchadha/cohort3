import useIsOnline from "./hooks/useIsOnline";

function UseIsOnlineHookExample() {
    const isOnline = useIsOnline();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>User Online Status</h1>
            <p>
                You are currently: <strong>{isOnline ? 'Online' : 'Offline'}</strong>
            </p>
        </div>
    );
}

export default UseIsOnlineHookExample;