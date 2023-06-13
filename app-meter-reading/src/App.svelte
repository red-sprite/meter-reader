<script>
  import reader from "./lib/reader.js";

  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");
  let entities = [];
  let display = [];

  function login() {
    reader.getTokenFromUNPW(username, password).then(() => {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      reader.getEntities().then((data) => {
        entities = data;
        entities.forEach((e) => {
          console.log("e", e);
          e.resources.forEach((r) => {
            reader.getReadings(r.resourceId).then((data) => {
              display = [...display, data];
              console.log("display", display)
            });
          });
        });
      });
    });
  }
</script>

<main>
  <h1>Red-Sprite Meter Readings</h1>

  <form>
    Username: <input type="text" bind:value={username} /><br />
    Password: <input type="password" bind:value={password} /><br />

    <button type="button" on:click={login}>Login</button>
  </form>

  {#if entities.length > 0}
    <div>
      {#each entities as e}
        {#each e.resources as r}
          <div>{r.name}</div>
        {/each}
      {/each}
    </div>
  {/if}
  {#if display.length > 0}
  <table>
    <tr>
      <th>Name</th>
    </tr>
    {#each display as d}
    <tr>
      <td>{ d.name}</td>
      {#each d.data as a}
        <td>{new Date(a[0]*1000).toLocaleString()} -- {a[1]}</td>
      {/each}
    </tr>
    {/each}
  </table>
    
  {/if}
</main>
