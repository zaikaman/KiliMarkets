import type { CommodityLot, HarvestProof } from '@kilimarkets/domain'

export interface MintingService {
  saveDraft(lot: CommodityLot): Promise<CommodityLot>
  attachProof(lotId: string, proof: HarvestProof): Promise<HarvestProof>
}

export const createMintingService = (): MintingService => ({
  saveDraft: async (lot) => lot,
  attachProof: async (_lotId, proof) => proof,
})
