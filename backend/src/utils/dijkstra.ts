const dijkstra = (graph: number[][], start: number): number[] => {
  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const visited = Array(n).fill(false);
  dist[start] = 0;
  for (let i = 0; i < n; i++) {
    let minDist = Infinity;
    let minIndex = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && dist[j] < minDist) {
        minDist = dist[j];
        minIndex = j;
      }
    }
    visited[minIndex] = true;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && graph[minIndex][j] > 0) {
        dist[j] = Math.min(dist[j], dist[minIndex] + graph[minIndex][j]);
      }
    }
  }
  return dist;
};
