export interface DBMapper<D, E> {
    toEntity(domain: D): E;
    toDomain(entity: E): D;
}