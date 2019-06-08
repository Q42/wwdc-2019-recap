export default (video: any, toggle: (id: string) => void) => (<div className="video" key={video.id}>
    <h2>
        {video.id} - {video.title} <a href={video.webPermalink}>(video)</a><span> </span>
        <label className="bookmark">Bookmark <input onChange={(e) => toggle(video.id, e.target.checked)} type="checkbox" checked={video.bookmarked} /></label>
    </h2>
    <div>{video.description}</div>
    <div>Keywords: {(video.keywords || []).map((key) => (<span className="keyword" key={key}>{key}</span> ))}</div>
    <div>Platforms: {(video.platforms || []).map((key) => (<span className="keyword" key={key}>{key}</span> ))}</div>
</div>)
  