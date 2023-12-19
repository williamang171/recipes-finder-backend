import json

def get_cached_query_result(r, key, prefix_key):
    result = r.get(f'{prefix_key}:{key}')
    if not result:
        return None
    unpacked_result = json.loads(result)
    return unpacked_result

def cache_query_result(r, key, result, prefix_key, ttl_seconds=None):
    if ('error' in result):
        return
    r_key = f'{prefix_key}:{key}'
    result_json = json.dumps(result)
    r.set(r_key, result_json)
    if ttl_seconds is not None:
        r.expire(r_key, ttl_seconds)
