import { ArchiveDetailModule } from '@/modules/ArchiveDetailModule'

export default async function ArchiveDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const debateId = (await params).id
  return <ArchiveDetailModule debateId={Number(debateId)} />
}
