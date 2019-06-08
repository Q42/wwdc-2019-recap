export interface Track {
    id: string;
    name: string;
    videos: string;
}

export default (tracks: Track[], toggleFilter) => (<div>
    <div className="tracks">Filters: 
        {tracks.map((track: Track) => (
            <label
                className={track.selected ? "selected track" : "track"}
                key={track.id}
            ><input checked={track.selected} onChange={(e) => toggleFilter(track.id, e.target.checked)} type="checkbox" />{track.name}</label>
        ))}
    </div>
</div>)
  