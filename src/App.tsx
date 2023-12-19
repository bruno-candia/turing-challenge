import useIterator from "./useIterator";

/*
# Welcome to Live condign interview

Question:

1 - Create a Custom ReactRook to fetch users from an API (https://randomuser.me/api/)
and display their picture and name on the page one.

2 - It must return the list of users, the current user, a function to fetch the next user and a function
to move back to the previous user

3 - Test the Custom ReactHook in the index.tsx
*/

function App() {
  const [userList, current, loading, next, previous] = useIterator(
    "https://randomuser.me/api/"
  );

  return (
    <div className="App">
      <p>
        All users:{" "}
        {userList.map((user, index) =>
          user.name === current?.name ? (
            <>
              <b key={`${user.name}`}>{user.name}</b>{" "}
            </>
          ) : (
            <>
              <span key={`${user.name}`}>{user.name}</span>{" "}
            </>
          )
        )}
      </p>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <img src={current?.picture} alt={`profile of ${current?.name}`} />
          <p>Current user: {current?.user}</p>
        </div>
      )}
      <button
        onClick={() => {
          next();
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          previous();
        }}
      >
        previous
      </button>
    </div>
  );
}

export default App;
