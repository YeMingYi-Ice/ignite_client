import ModUtils from "../modUtils.js";

// Highlight clan spawnpoints + team labels overlay (for e-ink readability)
export default (/** @type {ModUtils} */ { replaceCode, safeDictionary }) => {
    const dict = safeDictionary;
    const playerData = dict.playerData;
    const playerTerritories = dict.playerTerritories;

    // when rendered on game start
    replaceCode(
        `var x = (d.minX[i] + d.maxX[i] + 1 - hQ - 2) >> 1;
        var y = (d.minY[i] + d.maxY[i] + 1 - hQ - 2) >> 1;
        ctx.drawImage(a1e[game.gIsTeamGame ? ((game.gGameType === 9 && aD.a[i] === 5) ? 3 : t.ids[i]) : (i < game.gHumans ? 1 : 0)], x, y);`,
        `var highlight = __fx.settings.highlightClanSpawns && __fx.clanFilter.inOwnClan[i];
        if (highlight) hQ *= 2;
        var x = (d.minX[i] + d.maxX[i] + 1 - hQ - 2) >> 1;
        var y = (d.minY[i] + d.maxY[i] + 1 - hQ - 2) >> 1;
        if (highlight) ctx.drawImage(a1e[game.gIsTeamGame ? ((game.gGameType === 9 && aD.a[i] === 5) ? 3 : t.ids[i]) : (i < game.gHumans ? 1 : 0)], x, y, hQ, hQ);
        else ctx.drawImage(a1e[game.gIsTeamGame ? ((game.gGameType === 9 && aD.a[i] === 5) ? 3 : t.ids[i]) : (i < game.gHumans ? 1 : 0)], x, y);

        if (__fx.settings.showTeamLabels && game.gIsTeamGame && i < game.gHumans && playerData.playerTerritories[i] > 0) {
            var __tlT = bj.fX[i];
            if (__tlT !== 0) {
                var __tlNm = ["","红","绿","蓝","黄","粉","青","白","黑"][__tlT] || ("队" + __tlT);
                var __tlWx = (d.minX[i] + d.maxX[i] + 1) / 2;
                var __tlWy = (d.minY[i] + d.maxY[i] + 1) / 2;
                var __tlM  = ctx.getTransform();
                var __tlSx = __tlM.a * __tlWx + __tlM.c * __tlWy + __tlM.e;
                var __tlSy = __tlM.b * __tlWx + __tlM.d * __tlWy + __tlM.f;
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.font = "bold 14px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.lineJoin = "round";
                ctx.lineWidth = 4;
                ctx.strokeStyle = "rgba(255,255,255,0.95)";
                ctx.fillStyle = "#000";
                ctx.strokeText(__tlNm, __tlSx, __tlSy);
                ctx.fillText(__tlNm, __tlSx, __tlSy);
                ctx.restore();
            }
        }`,
        { dictionary: { playerData, playerTerritories } }
    )

    // when rendered during spawn selection
    replaceCode(
        `var x = f.w * ((playerData.minX[i] + playerData.maxX[i] + 1) / 2 - gE) / (li - gE) - 0.5 * j7;
                var y = f.h * ((playerData.minY[i] + playerData.maxY[i] + 1) / 2 - ex) / (lj - ex) - 0.5 * j7;
                if (x > f.w || y > f.h || x < -j7 || y < -j7) { return; }
                mainCanvas.setTransform(bg, 0, 0, bg, x, y);
                mainCanvas.drawImage(vL[game.gIsTeamGame ? TeamManager.ids[i] : 1], 0, 0);`,

        `var highlight = __fx.settings.highlightClanSpawns && __fx.clanFilter.inOwnClan[i];
        if (highlight) j7 *= 2;
                var x = f.w * ((playerData.minX[i] + playerData.maxX[i] + 1) / 2 - gE) / (li - gE) - 0.5 * j7;
                var y = f.h * ((playerData.minY[i] + playerData.maxY[i] + 1) / 2 - ex) / (lj - ex) - 0.5 * j7;
                if (x > f.w || y > f.h || x < -j7 || y < -j7) { return; }
                if (highlight) mainCanvas.setTransform(bg*2, 0, 0, bg*2, x, y);
                else mainCanvas.setTransform(bg, 0, 0, bg, x, y);
                mainCanvas.drawImage(vL[game.gIsTeamGame ? TeamManager.ids[i] : 1], 0, 0);`
    )
}
