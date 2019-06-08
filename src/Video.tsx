export default (video: any) => (<div>
    <h2><a href={video.webPermalink}>{video.title}</a> <button className="bookmark">Bookmark</button></h2>
    <div>{video.description}</div>
    <div>{(video.keywords || []).map((key) => (<span className="keyword" key={key}>{key}</span> ))}</div>
</div>)
  