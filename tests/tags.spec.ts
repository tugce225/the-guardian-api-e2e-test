import { test, expect } from '@playwright/test';
import { API_KEY } from "../consts";

test('Tags response should be a valid response', async ({ request }) => {
    const response = await request.get(`/tags?api-key=${API_KEY}`);
    expect(response.ok()).toBeTruthy();
    const data: any = await response.json();
    const dataContent: any = data.response;

    expect(dataContent).toHaveProperty('status');
    expect(typeof dataContent.status).toBe('string');

    expect(dataContent).toHaveProperty('userTier');
    expect(typeof dataContent.userTier).toBe('string');

    expect(dataContent).toHaveProperty('total');
    expect(typeof dataContent.total).toBe('number');

    expect(dataContent).toHaveProperty('startIndex');
    expect(typeof dataContent.startIndex).toBe('number');

    expect(dataContent).toHaveProperty('pageSize');
    expect(typeof dataContent.pageSize).toBe('number');

    expect(dataContent).toHaveProperty('currentPage');
    expect(typeof dataContent.currentPage).toBe('number');

    expect(dataContent).toHaveProperty('pages');
    expect(typeof dataContent.pages).toBe('number');

    expect(dataContent).toHaveProperty('results');
    expect(dataContent.results instanceof Array).toBeTruthy();

    const results: any[] = dataContent.results;
    results.forEach(function(item) {
        expect(item).toHaveProperty('id');
        expect(typeof item.id).toBe('string');

        expect(item).toHaveProperty('type');
        expect(typeof item.type).toBe('string');

        expect(item).toHaveProperty('webTitle');
        expect(typeof item.webTitle).toBe('string');

        expect(item).toHaveProperty('webUrl');
        expect(typeof item.webUrl).toBe('string');

        expect(item).toHaveProperty('apiUrl');
        expect(typeof item.apiUrl).toBe('string');

        if(item.activeSponsorships){
            item.activeSponsorships.forEach(function (activeSponsorship){
                expect(activeSponsorship).toHaveProperty('sponsorshipType');
                expect(typeof activeSponsorship.sponsorshipType).toBe('string');

                expect(activeSponsorship).toHaveProperty('sponsorName');
                expect(typeof activeSponsorship.sponsorName).toBe('string');

                expect(activeSponsorship).toHaveProperty('sponsorLogo');
                expect(typeof activeSponsorship.sponsorLogo).toBe('string');

                expect(activeSponsorship).toHaveProperty('sponsorLink');
                expect(typeof activeSponsorship.sponsorLink).toBe('string');

                expect(activeSponsorship).toHaveProperty('sponsorLogoDimensions');
                expect(typeof activeSponsorship.sponsorLogoDimensions).toBe('object');
            });
        }
    });
});

