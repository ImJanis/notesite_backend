CREATE INDEX "search_index" ON "records" USING gin (
    (
        setweight(to_tsvector('simple', "title"), 'A') || setweight(to_tsvector('simple', "description"), 'B') || setweight(to_tsvector('simple', "notes_internal"), 'C')
    )
);