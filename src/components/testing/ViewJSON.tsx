export default function ViewJson({ jsonData }: { jsonData: any }) {
  return (
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
  )
}
