export default async function animeInfoService() {

    const resp = await fetch(
        `https://api-aniwatch.onrender.com/anime/info?id=${anime-id}`
      );
      const data = await resp.json();
      console.log(data);

}